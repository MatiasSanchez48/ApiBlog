## _**API CRUD | ABMC**_

## _**/PRODUCTOS**_

> \[GetProductos\] - **Obtener productos**. 
  
> \[GetProductosFiltrados\] - **Obtiene los Productos en Con Filtros**  
URL:/filtrado  
si queres agregarle un filtrado tenes que agregarle en la URL al final "?" y cada query, cada query tiene que separarce por un "&".  
**EJ**: URL/filtrado?limit=1&page=2  
estos son todos los filtros que hay:  
\- \[ **Limite** \] : limit=1  
\- \[ **Paginas** \] : page=1  
\- \[ **Nombre** (del producto) **\] :** nombre=prod1  
\- \[ **Precio Minimo \] :** precioMin=0  
\- \[ **Precio Maximo \] :** precioMax=0  
\- \[ **Ordenar por \] :** orderby:precio  
\- \[ **Order \] :** order=asc 
  
> \[GetProductosPaginados\] - Obtiene los Productos en Con Filtros  
URL:/paginado  
si queres agregarle un filtrado tenes que agregarle en la URL al final "?" y cada query, cada query tiene que separarce por un "&".  
EJ: URL/filtrado?limit=1&page=2  
estos son todos los filtros que hay:  
\- \[ Limite \] : limit=1  
\- \[ Paginas \] : page=1 
  
> \[GetProductoByID\] - **Obtener un producto:**  
_URL_: id del producto. 
  
> \[PutEditarProducto\] - **Editar un producto que ya existe:**  
_URL_: id del producto.  
Headers:  
Authorization : "(token generado al logearse)".  
_Body_: { "nombre":"(nombre que quieras)", "precio":"(precio que quieras)"}. 
  
> \[PostCrearProducto\] - **Crear un nuevo producto:**  
URL:  
Headers:  
Authorization : "(token generado al logearse)".  
_Body_: { "nombre":"(nombre que quieras)", "precio":"(precio que quieras)"}. 
  
> \[DelEliminarProducto\] - **Soft Delete eliminar un producto:**  
_URL_: id del producto.  
Headers:  
Authorization : "(token generado al logearse)".  
Body: 
  
> \[DelEliminarProducto\] - **Eliminar definitivo a un producto**.  
_URL_:/definitivo/ id del producto.  
Headers:  
Authorization : "(token generado al logearse)". 
  

## _**/BLOG**_

> \[GetBlog\] - **Obtener los blogs**. 
  
> \[GetProductoByID\] - **Obtener un blog:**  
_URL_: id del producto. 
  
> \[PostCrearBlog\] - **Crear un Blog:**  
URL:  
Headers:  
Authorization : "(token generado al logearse)".  
Body: {  
"titulo":(titulo que prefieras(String)),  
"descripcion":(descripcion que quieras(String)),  
"contenido":(contenido que quieras(String)),  
"imagen":(imagen que quieras (URL)(String)),  
"autor": (ID del autor(String))  
}. 
  
> \[PutEditarBlog\] - **Editar un blog ya existente:**  
URL: id del producto. Headers:  
Authorization : "(token generado al logearse)"  
Body: {  
"titulo":(titulo que prefieras(String)),  
"descripcion":(descripcion que quieras(String)),  
"contenido":(contenido que quieras(String)),  
"imagen":(imagen que quieras (URL)(String)),  
}. 
  
> \[DelEliminarBlog\] - **Soft Delete eliminar un blog:**  
_URL_: id del producto.  
Headers:  
Authorization : "(token generado al logearse)". 
  

## _**/USUARIOS**_

> \[PostRegistrarse\] - **Crear un nuevo usuario y un autor:**  
URL:/register  
Body: {  
"username": (nombre con el que poder logearse(String)),  
"email": (Email o Correo electronico(String)),  
"password": (Contraseña(String)),  
"fechaNacimiento": (Fecha de Nacimiento("1995-03-15T00:00:00.000Z"))  
}. 
  
> \[PostLogearse\] - **Logearse con un usuario ya Registrado**:  
URL:/login  
Body: {  
"username": (nombre con el que poder logearse o Email(String)),  
"password": (Contraseña(String)),  
}. 
  
> \[PostNuevoToken\] - **Genera Nuevo token de acceso:**  
_URL_:/token.  
Headers:  
x-refresh-token : (Token de Refresh Token). 
  
> \[GetBloqueado\] - Test de los tokens generados.  
Headers:  
Authorization : "(token generado al logearse)". 
  

## _**/AUTORES**_

> \[GetAutores\] - **Obetener los autores ya existentes:**  
URL: 
  
> \[GetAutorByID\] - **Obtiene el autor por id**:  
URL:/id del autor 
  
> \[PostCrearUnAutor\] - **Crea un nuevo autor:**  
_URL_:/token.  
Headers:  
Authorization : "(token generado al logearse)".  
Body:  
{  
"nombre": (Nombre que quieras(String)),  
"apellido": (Apellido que quieras(String)),  
"nacionalidad": (Nacionalidad que quieras(String)),  
"fechaNacimiento": (Fecha de Nacimiento ej("2024-12-12T00:00:00Z"),  
"bibliografia": (Bibliografia que quieras(String)),  
"imagen": (Imagen que quieras (URL)(String)),  
"redSocial": (Red Social que quieras(String))  
} 
  
> \[PutEditarAutor\] - Edita un autor ya existente.  
URL:id del autor a editar.  
Headers:  
Authorization : "(token generado al logearse)".  
Body:  
{  
"nombre": (Nombre que quieras(String)),  
"apellido": (Apellido que quieras(String)),  
"nacionalidad": (Nacionalidad que quieras(String)),  
"fechaNacimiento": (Fecha de Nacimiento ej("2024-12-12T00:00:00Z"),  
"bibliografia": (Bibliografia que quieras(String)),  
"imagen": (Imagen que quieras (URL)(String)),  
"redSocial": (Red Social que quieras(String))  
} 
  
> \[DelEliminarAutor\] - **Soft Delete de un autor**.  
URL:id del autor a Eliminar.  
Headers:  
Authorization : "(token generado al logearse)".  
Body: