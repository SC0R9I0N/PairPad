import { useState } from 'react';
import { useReducer, useTable } from 'spacetimedb/react';
import { reducers, tables } from './module_bindings';

function ReducerTest() {
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const createSession = useReducer(reducers.createSession);
    const [sessions, isLoading] = useTable(tables.sessions);
    const [members, isReady] = useTable(tables.members);

    const handleClick = async () => {
        setError(null);
        try {
        await createSession({ displayName: displayName.trim() });
        } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        }
    };

    const ownerNameFor = (
      sessionID: string,
      owner: { toHexString(): string }
    ): string | undefined => {
      const ownerHex = owner.toHexString();
      const match = members.find(
        (m) =>
          m.sessionId === sessionID && m.identity.toHexString() === ownerHex
      );
      return match?.name;
    };

    return (
    <div>
      <input
        type="text"
        placeholder="Display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button type="button" onClick={handleClick}>
        Create session
      </button>

      {error && <p>Error: {error}</p>}

      <h3>Sessions {isLoading ? '(loading...)' : `(${sessions.length})`}</h3>
      <ul>
        {sessions.map((row) => (
          <li key={row.sessionId}>
            {Object.entries(row)
              .map(([key, value]) => `${key}: ${String(value)}`)
              .join(', ')}
            {' | owner name: '}
            {ownerNameFor(row.sessionId, row.owner) ?? '(not found yet)'}
          </li>
        ))}
      </ul>
            <ul>
        {members.map((row, i) => (
          <li key={i}>
            {Object.entries(row)
              .map(([key, value]) => `${key}: ${String(value)}`)
              .join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReducerTest;