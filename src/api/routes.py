"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required

from werkzeug.security import generate_password_hash, check_password_hash   
import datetime
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#------< registrar usuario >-------------#

@api.route('/register', methods=['POST'])
def user_register():
    
    print(request.get_json())
    
    email= request.json.get("email")
    password= request.json.get("password")

    
#-------< validacion de usuario >-------#

    if not email:
        return jsonify({"error": "email is requare"}), 422
    
    if not password:
        return jsonify({"error": "password is requare"}), 422
    

        


    #-----< creacion de usuario ------------------------------------------->
    
    user_Faund = User.query.filter_by(email=email).first()
    
    if user_Faund:
        return jsonify({"message": "username is not available"}), 400
    
    user = User()
    user.email = email
    user.password = generate_password_hash(password)
    user.save()
    
    return jsonify({"succes": "Registro exitoso, por favor inicie sesión"}), 200



#-----< Login User  codigo original-rama form>------------------------------------------------------------------->
@api.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
        
    email = request.json.get("email")
    password = request.json.get("password")

# ------< validacion usuario, datos ingresados >------#
    if not email:
        return jsonify({"error": "email is requare"}), 422

    if not password:
        return jsonify({"error": "password is requare"}), 422

# ------< BUSCAMOS AL USUARIO >------------------------------------->
    user = User.query.filter_by(email=email).first()
    
#------< si no existe el usuario >------------------------------------->
    if not user: 
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
    
#------< validamos la contraseña >------------------------------------->
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401 
    
        
    expires=datetime.timedelta(days=30)
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    #    refresh_token = create_refresh_token(identity=user.id)
    print('TOKEN DE ACCESO GENERADO', access_token)
    return { 'access_token': access_token }, 200
    # print(access_token)


# @api.route("/logout", methods=["GET"])
# @jwt_required
# def logout():
#     jti = get_raw_jwt()['jti']   # JWT ID
#     blacklist.add(jti)          # mark token as revoked
#     return {"result":"Token has been logged out"}, 200

    

    data = {
        "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }


    return jsonify({"data":data}), 200


# generando ruta privada

@api.route('/private', methods=['POST'])
@jwt_required()
def private():
    
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"message": "ruta  privada", "user": user.email}), 200