import { schema, table, t } from 'spacetimedb/server';
import { SenderError } from 'spacetimedb/server';

const MAX_NAME_LENGTH = 30;
const SESSION_ID_LENGTH = 8;
const SESSION_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

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

const generateSessionID = (randomInt: (min: number, max: number) => number): string => {
  let sessionID = "";
  for (let i = 0; i < SESSION_ID_LENGTH; i++) {
    const index = randomInt(0, SESSION_ID_ALPHABET.length - 1);
    sessionID += SESSION_ID_ALPHABET[index];
  }
  return sessionID;
}

export const createSession = spacetimedb.reducer(
  { displayName: t.string() },
  (ctx, { displayName }) => {
    displayName = displayName.trim();
    const trimmedNameValid = displayName.length <= MAX_NAME_LENGTH && displayName.length > 0;

    if (!trimmedNameValid) {
      throw new SenderError("invalid name");
    }

    let sessionID: string | undefined = undefined;

    for (let i = 0; i < 5; i++) {
      const candidateID = generateSessionID((min, max) => ctx.random.integerInRange(min, max));
      const existing = ctx.db.sessions.sessionID.find(candidateID);
      if (!existing) {
        sessionID = candidateID
        break;
      }
    }
    if (sessionID === undefined) {
      throw new SenderError("Could not create a session, please try again.");
    }
    ctx.db.sessions.insert({ sessionID, createdTime: ctx.timestamp, owner: ctx.sender });
    ctx.db.members.insert({ name: displayName, isOwner: true, identity: ctx.sender, sessionID, id: 0n })
  }
);
