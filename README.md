# PairPad
A collaborative text editor for our Software Engineering final project

### POST /sessions
Creates a new session

Response:
{
  "sessionId": "string"
}

### GET /sessions/:sessionId
Returns session data

Response:
{
  "sessionId": "string",
  "content": "string"
}