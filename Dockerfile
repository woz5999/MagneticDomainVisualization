FROM httpd

COPY css/main.css /usr/local/apache2/htdocs/css/
COPY css/bootstrap.css /usr/local/apache2/htdocs/css
COPY js/bundle.js /usr/local/apache2/htdocs/js/
COPY MagneticDomainVisualization.html /usr/local/apache2/htdocs/
COPY MagneticDomainVisualization.html /usr/local/apache2/htdocs/index.html
