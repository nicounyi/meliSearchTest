# meliSearchTest
Test tecnico para Mercado Libre

# Como instalar el proyecto

1) Clonar el repo 

```bash
git clone https://github.com/nicounyi/meliSearchTest.git
```

Importante! Antes de instalar, revisar si se esta usando una version de node superior a la 10

2) Instalar dependencias

El backend del proyecto esta dentro de la carpeta /src/ . Una vez alli instalar dependencias con:

```bash
npm install
```

3) Instalar dependencias del frontend

El frontend se encuentra en la carpeta /client/ .  Una vez alli instalar dependencias de igual manera:

```bash
npm install
```

# Como inciar el proyecto

Para iniciar el proyecto, nos ubicamos sobre la carpeta /src/ (la que contiene el backend) y escribimos 

```bash
npm start
```

Esto inicia primero el backend en el puerto 8010 y el front en el 3000


# Estructura del proyecto

Como mencioné el proyecto se divide en:

BackEnd /src/ - node y express

FrontEnd /Client/ - React

Elegí hacerlo de esta manera para poder trabajar de una manera mas prolija.

El backend esta hecho con node y express, y se ubica en el puerto 8010 para que no genere conflictos con puertos de uso comun como el 3000 o el 9000. 

El frontend se desarrollo con react, utilizando la estructura de create-react-app. El mismo se divide en vistas y componentes. Las vistas son ItemList que contiene los resultados hechos por la busqueda e Item que muestra la información del producto seleccionado.

Luego tenemos los componentes:

- SearchBar: en la searchbar se encuentra la lógica necesaria para realizar la busqueda (es el encargado de hacer la request al backend)  y crear el queryString para el ruta /items?search= . Una vez obtuvo resultados, los almacena en el store de la app.
- Result: Este componente es el que se muestra en la vista ItemList, por cada item encontrado en la request
- Breadcrumb: Componente que muestra las categorias encontradas para la busqueda
- Button: Componente de boton que permite agregar un nuevo botón en la app.

El flujo de la app se basa en que cada vez que el componente SearchBar recibe o genera una nueva busqueda, el componente item list lista los resultados que le llegan del store global, dicho store se manega con la libreria Redux, lo mismo sucede con el componente Breadcrumb. Cuando se selecciona un item, se ingresa a la vista Item donde se genera la url usando como parametro el ID del producto.



