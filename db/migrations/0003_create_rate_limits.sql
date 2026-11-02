-- One fixed-window counter per limit and client. Keys are hashed, so no IPs or emails are stored.
CREATE TABLE rate_limits (
  key      text PRIMARY KEY,
  count    integer NOT NULL,
  reset_at timestamptz NOT NULL
);

CREATE INDEX rate_limits_reset_at ON rate_limits (reset_at);
