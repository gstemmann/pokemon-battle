from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, PokemonInfo, Abilities
from forms import RegisterForm, LoginForm

app = Flask (__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///pokemon"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = ( "it's a secret")
toolbar = DebugToolbarExtension(app)

connect_db(app)



@app.route('/static')
def homepage():
    """Show homepage: """


    return render_template('home.html')



@app.errorhandler(404)
def page_not_found(e):
    """Show 404 NOT FOUND page."""

    return render_template('404.html'), 404



@app.route('/users/new', methods=["GET"])
def users_new_form():
    """Show a form to create a new user"""

    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.register(username, password)

        db.session.commit()
    return render_template('users/new.html')



@app.route("/users/new", methods=["POST"])
def users_new():
    """Handle form submission for creating a new user"""

    new_user = User(
        username=request.form['username'])

    db.session.add(new_user)
    db.session.commit()
    flash(f"User {new_user.username} added.")

    return redirect("/users")


@app.route('/users/<int:user_id>')
def users_show(user_id):
    """Show a page with info on a specific user"""

    user = User.query.get_or_404(user_id)
    return render_template('users/show.html', user=user)
