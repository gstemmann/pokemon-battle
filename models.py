from flask_sqlalchemy import SQLAlchemy

DEFAULT_IMAGE_URL= 'https://www.kindpng.com/picc/m/227-2271952_red-sprite-pokemon-png-transparent-png.png'
db = SQLAlchemy()

def connect_db(app):
    """Connect this database to provided Flask app.
    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)


class User(db.Model):
    """Site user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)
    
    def __repr__(self):
        return f"<User {self.id} {self.username} {self.password} >"


# class Pokemon(db.Model):

#     __tablename__ = 'pokemon_info'

#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     name = db.Column(db.Text,  nullable=False)
#     sprite = db.Column(db.Text, nullable=False)
#     hp = db.Column(db.Integer, nullable=False)   
#     ability_id = db.Column(
#         db.Integer,
#         db.ForeignKey('abilities.id'), nullable=True)

#     def __repr__(self):
#         return f"<Pokemon {self.id} {self.name} {self.hp}>"

# class Ability(db.Model):

#     __tablename__ = 'abilities'

#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     name = db.Column(db.Text, nullable=False)
