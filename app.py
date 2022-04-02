from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Pokemon, Abilities
from forms import RegisterForm, LoginForm
from unicodedata import name
import requests
import pypokedex

app = Flask (__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///pokemon"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = ( "it's a secret")
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def start():
    return render_template('home.html')


############################# USER ROUTES #################################
@app.route('/signup', methods=["GET", "POST"])
def signup():

    """Handle user signup.
    Create new user and add to DB. Redirect to home page.
    If form not valid, present form.
    """

    form = RegisterForm()

    if form.validate_on_submit():
        user = User(
                username=form.username.data,
                password=form.password.data,
            )
        if user:
            flash(f"Hello, {user.username}!", "account successfully created")
            db.session.commit()
            return redirect("/")
    else:
        return render_template('users/signup.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data,
                                 form.password.data)

        if user:
            flash(f"Hello, {user.username}!", "success")
            return redirect("/")

        flash("Invalid credentials.", 'danger')

    return render_template('users/login.html', form=form)

# ADD A USER PROFILE HERE WITH LIST OF USER'S POKEMON

# @app.route('/user/<id:int>', methods=['GET'])
# def show_user(user_id):
#     user = User.query.get(user_id)
#     return render_template('user/show.html', user=user)

@app.route('/logout')
def logout():
    """Handle logout of user."""

    flash('you are now logged out')
    return redirect("/login")


###################### POKEMON ROUTES ############################


# @app.route('/pokemon/show')
# def get+pokemon_name():
#     res = requests.get()

# @app.route('/pokemon/choose')
# def show_pokemon_list():
#     # pokemon_input = request.form['pokemon_input']
#     # print(pokemon_input)
#     pokemon = pypokedex.get(name='dragonite')
#     moves = [move.name for move in pokemon.moves['sun-moon']]
#     # types = pokemon.types

#     return render_template ('/pokemon/choose.html', pokemon=pokemon, moves=moves)


@app.route('/pokemon/battle')
def show_pokemon_battle_screen():
  

    return render_template ('/pokemon/battle.html')
