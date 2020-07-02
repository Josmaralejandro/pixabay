import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {

      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '15972846-02ace5bd8784661cfe2b0623d';

      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //Calcular el total de paginas
      const paginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(paginas);

      //Mover la pantalla hacia la parte superior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    consultarApi();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    let nuevaPagina = paginaActual + 1;
    guardarPaginaActual(nuevaPagina);
  }

  const paginaSiguiente = () => {
    let nuevaPagina = paginaActual + 1;
    guardarPaginaActual(nuevaPagina);
  }

  return (
    <div className="app container">
     <div className="jumbotron">
       <p className="lead text-center">Buscador de imágenes</p>
       <Buscador
          guardarBusqueda={guardarBusqueda}
       />
     </div>
     <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {
          paginaActual === 1 ? null : (<button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">&laquo; Anterior</button>)
        }

        {
          paginaActual === totalPaginas ? null : (<button onClick={paginaSiguiente} type="button" className="btn btn-info">Siguiente &raquo;</button>)
        }
     </div>
    </div>
  );
}

export default App;
