#!/bin/sh
set -e

# Generate assets/env.js dynamically from container environment variables
mkdir -p /usr/share/nginx/html/assets
cat <<EOF > /usr/share/nginx/html/assets/env.js
(function(window) {
  window.__env = window.__env || {};
  window.__env.OIDC_ISSUER = "${OIDC_ISSUER:-http://localhost:9091}";
  window.__env.OIDC_CLIENT_ID = "${OIDC_CLIENT_ID:-netzgrafikeditor}";
  window.__env.OIDC_SCOPE = "${OIDC_SCOPE:-openid profile email groups offline_access}";
  window.__env.OIDC_REDIRECT_URI = "${OIDC_REDIRECT_URI:-}";
  window.__env.OIDC_REQUIRE_HTTPS = "${OIDC_REQUIRE_HTTPS:-false}";
  window.__env.OIDC_DEBUG = "${OIDC_DEBUG:-false}";
  window.__env.BACKEND_URL = "${BACKEND_URL:-http://localhost:8080}";
  window.__env.DISABLE_BACKEND = "${DISABLE_BACKEND:-false}";
  window.__env.APP_LABEL = "${APP_LABEL:-Authelia}";
})(this);
EOF

# Also run ngssc if binary exists
if [ -x /usr/sbin/ngssc ]; then
  /usr/sbin/ngssc insert /usr/share/nginx/html/ 2>/dev/null || true
fi
