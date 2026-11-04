import { schema, table, t } from 'spacetimedb/server';
import { SenderError } from 'spacetimedb/server';

const MAX_NAME_LENGTH = 30;

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
      sessionID: t.string(),
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
  { displayName: t.string(), candidateID: t.string() },
  (ctx, { displayName, candidateID }) => {
    displayName = displayName.trim();
    const trimmedNameValid = displayName.length <= MAX_NAME_LENGTH && displayName.length > 0;

    if (!trimmedNameValid) {
      throw new SenderError("invalid name");
    }
    
    let sessionID = undefined;
    const existing = ctx.db.sessions.sessionID.find(candidateID);
    if (!existing) {
        sessionID = candidateID
    } else {
      throw new SenderError("duplicate sessionID generated");
    }

    if (sessionID === undefined) {
      throw new SenderError("Could not create a session, please try again.");
    }
    ctx.db.sessions.insert({ sessionID: candidateID, createdTime: ctx.timestamp, owner: ctx.sender });
    ctx.db.members.insert({ name: displayName, isOwner: true, identity: ctx.sender, sessionID, id: 0n })
  }
);
