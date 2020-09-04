//Variables

const carrito = document.querySelector('#carrito'),
      contenedorCarrito = document.querySelector('#lista-carrito tbody'),
      vaciarCarritoBtn = document.querySelector('#vaciar-carrito'),
      listaCursos = document.querySelector('#lista-cursos');
let   carritoCompras = [];      

//Event listeners
cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    
    //Elimina cursos del carrito desde el boton de cada uno
    carrito.addEventListener('click', eliminarCurso);
    
    //Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        carritoCompras = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });
    
    
    //Elimina todos los cursos del carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoCompras = []; //Reiniciamos el arreglo
    
        limpiarHTML(); //Eliminamos todo de HTML        
    });
}

//Funciones

function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina curso del carrito
function eliminarCurso(e) { 
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //Elimina del arreglo el articulo de
        carritoCompras = carritoCompras.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }


}





//Lee el contenido de HTML al que le damos click y extrae la informacion del curso
function leerDatosCurso (curso){
    //Objeto con la informacion del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya esta en el carrito
    const existe = carritoCompras.some(curso => curso.id == infoCurso.id)

    if(existe){
        const cursos = carritoCompras.map(curso => {
            if(curso.id == infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else{
                return curso; //Retorna los objetos no duplicados
            }
        })
        carritoCompras = [...cursos];
    } else{
            //Agrega elementos al arreglo de carrito
            carritoCompras = [...carritoCompras, infoCurso];  
    }


    carritoHTML();
}

//Muestra el carrito de compras en el DOM
function carritoHTML() {

    //Limpia el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    carritoCompras.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso 
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td>
                <img src='${imagen}' width='100'>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </a> 
            </td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
 
        //Agregar el carrito de compras a localStorage
        sincronizarStorage();
 
    });
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carritoCompras));
}


//Elimina los cursos del tbody
function limpiarHTML (){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}