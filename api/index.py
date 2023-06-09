# Import the necessary packages
from flask import Flask, render_template

# Create the application object
app = Flask(__name__, template_folder='templates', static_folder='static')

# Use decorators to link the function to a url
@app.route('/')
def index():
    return render_template("index.html", title="Home")
@app.route('/contact/')
def contact():
    return render_template("contact.html", title="Contact")

# Create the AMP version of the site
@app.route('/amp/')
def amp():
    return render_template("index_amp.html", title="Home")

@app.route('/robots.txt')
def robots():
    return str(open("./api/robots.txt").read())
@app.route('/sitemap.xml')
def sitemap():
    return str(open("./api/sitemap.xml").read())

# Start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)
