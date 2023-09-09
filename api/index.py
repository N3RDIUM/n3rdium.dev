# Import the necessary packages
from flask import Flask, render_template

# Create the application object
app = Flask(__name__, template_folder="templates", static_folder="static")


# Use decorators to link the function to a url
@app.route("/")
def index():
    return render_template("index.html", title="Home")


@app.route("/universe")
def universe():
    return render_template("universe.html", title="Universe")


# Start the server with the 'run()' method
if __name__ == "__main__":
    app.run(debug=True)
