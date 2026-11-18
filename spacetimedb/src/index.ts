import { schema, table, t } from 'spacetimedb/server';
import { SenderError } from 'spacetimedb/server';

const MAX_NAME_LENGTH = 30;

const DUPLICATE_SESSION_MSG = "duplicate sessionID";

const spacetimedb = schema({
  sessions: table(
    { public: true },
    {
      sessionID: t.string().primaryKey(),
      createdTime: t.timestamp(),
      owner: t.identity(),
    }
  ),
  members: table(
    {public: true},
    {
      name: t.string(),
      isOwner: t.bool(),
      identity: t.identity(),
      sessionID: t.string().index('btree'),
      id: t.u64().primaryKey().autoInc(),
    }
  )
});
export default spacetimedb;

export const init = spacetimedb.init(_ctx => {
  // Called when the module is initially published
});

export const onConnect = spacetimedb.clientConnected(_ctx => {
  // Called every time a new client connects
});

export const onDisconnect = spacetimedb.clientDisconnected(_ctx => {
  // Called every time a client disconnects
});

export const createSession = spacetimedb.reducer(
  { displayName: t.string(), sessionId: t.string() },
  (ctx, { displayName, sessionId }) => {
    displayName = displayName.trim();
    const trimmedNameValid = displayName.length <= MAX_NAME_LENGTH && displayName.length > 0;

    if (!trimmedNameValid) {
      throw new SenderError("invalid name");
    }

    if (ctx.db.sessions.sessionID.find(sessionId)) {
      throw new SenderError(DUPLICATE_SESSION_MSG);
    }

    if (sessionId === undefined) {
      throw new SenderError("Could not create a session, please try again.");
    }
    ctx.db.sessions.insert({ sessionID: sessionId, createdTime: ctx.timestamp, owner: ctx.sender });
    ctx.db.members.insert({ name: displayName, isOwner: true, identity: ctx.sender, sessionID: sessionId, id: 0n })
  }
);

//need to check if the ctx.sender matches the identity of the owner of the session
//also need to check if the ctx.sender identity is flagged as an owner
//on revoke session
//need to clear the db table entry with this session
//get rid of each member that was in that session from the db table
export const revokeSession = spacetimedb.reducer(
  { displayName: t.string(), candidateID: t.string() },
  (ctx, { candidateID }) => {
    const sessionRow = ctx.db.sessions.sessionID.find(candidateID);
    if (!sessionRow) {
      throw new SenderError("sessionID not found");
    }
    
    if (!sessionRow.owner.equals(ctx.sender)) {
      throw new SenderError("not the owner");
    }
    
    ctx.db.sessions.sessionID.delete(candidateID);
    ctx.db.members.sessionID.delete(candidateID);

  }
)
