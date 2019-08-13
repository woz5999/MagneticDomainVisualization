FROM httpd:2-alpine

ARG JS_BUNDLE=bundle.js

COPY css /usr/local/apache2/htdocs/css
COPY js/$JS_BUNDLE /usr/local/apache2/htdocs/js/bundle.js
COPY resources/  /usr/local/apache2/htdocs/resources/
COPY MagneticParticleVisualization.html /usr/local/apache2/htdocs/
COPY MagneticParticleVisualization.html /usr/local/apache2/htdocs/index.html
