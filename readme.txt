Para arrancar las dos aplicaciones hay creado un scrip, asiq si en cualquiera de las dos, os meteis en su carpeta y poneis
"npm run dev" arranca su parte.
En el back la estructura es la siguiente:
    Config:Archivos de configracion global del server y constantes
    Constants:Enumerables, en javascript no existen como tal asiq es la forma mejor de hacerlo
    Controllers: Son los tipicos controladores que ya hemos visto en java, la cosa es que aqui se mete tambien la logica
        de negocio, se podria dividir, pero es una aplicacion demasiado pequeña pa eso
    Middewares:Son los archivos que cogen la peticion y hacen algo con ella antes de que llegue a su controlador, por  
        ejemplo un middleware para comprobar si esta autenticado antes de entrar en una url que lo requiere.
    Models:Modelos de la base de datos, que se esta utilizando mongoose, echadle un ojo al de usuario o topics, es muy facil
         y con eso ya se crea un repo del palo jpa. Tambien hay en esta carpeta otros modelos como la paginacion que ya os explicare
    Routes: Son archivos para decir , vale me llega esta peticion, se encarga este controlador, y ya.
    Services: Aqui entraria la parte de negocio si dividiesemos los controllers, pero por el momento, son servicios compartidos,
        como el que descripcta el token, o el que buildea un error. Fijaos como se lanza un error en usuarios.controller,
        es un lanzador centralizado, para que todas las respuestas sean iguales, si no se hace asi peta, tiene que lanzarse
        dentro del "next" y poner return justo debajo.
    index.js :lo de siempre
    database.js :configuracion basica de la base de datos

En el front de la estructura se encargara emilio asiq poco puedo decir, lo que si, para hacer las llamadas al back utilizad 
la clase ApiService, tiene un metodo request que requiere la url, un body, un header y un metodo.Que todo pase por ahi, creare
cuando pueda metodos en el front para hacer la paginacion y filtrado, pero os adelanto que la paginacion va en parametros en
el header, separados por comas xD, no hay forma mucho mejor de hacerlo. Ah y para la autenticacion se utiliza un token, que
de momento guarda usuario y tiempo de caducidad, si quereis meterle algo mas que necesiteis de continuo se puede meter en 
el servicio de token del back