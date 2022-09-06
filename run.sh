#!/bin/sh
set -e
set -x

PATH_JS=/usr/share/nginx/html/static/js/main.*
PATH_HTML=/usr/share/nginx/html/index.html

sed -i "s#http://localhost:3000#${API_URL}#g" $PATH_JS

nginx -g 'daemon off;'
