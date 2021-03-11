import React, { useState } from "react";
import shortid from 'shortid'

function App() {

  const [Tarea, setTarea] = useState("");
  const [ArrayTareas, setArrayTareas] = useState([]);
  const [ModoEdit, setModoEdit] = useState(false)
  const [ID, setID] = useState('')
  const [Error, setError] = useState(null)

  const agregarTarea = (e) => {
    e.preventDefault();
    //validaciones
    if (Tarea.trim()) {
      const auxTarea = {
        id: shortid.generate(),
        nombre: Tarea
      }
      setArrayTareas([...ArrayTareas, auxTarea]); //agrega tarea al array
      setError(null)
    } else {
      setError("Debe ingresar una tarea")
    }
    //LIMPIAR CAMPOS
    setTarea('')
  };

  const eliminarTarea = (e) =>{
    const tareaID = e.target.value
    const arrayFlitrado = ArrayTareas.filter(arr => arr.id !== tareaID)
    setArrayTareas(arrayFlitrado)
  }
  
  const modoEditToggle = (modo=false,item=false) => {
    setError(null)
    if (modo && item) {
      setModoEdit(true)
      setTarea(item.nombre)
      setID(item.id)
    }else{
      setModoEdit(false)
      setTarea('')
    }
  }

  const editarTarea = (e) =>{
    e.preventDefault()
    
    if (Tarea.trim()) {
      const tareaEditada = ArrayTareas.map(item => item.id === ID ? {id:ID,  nombre:Tarea} : item)

      setArrayTareas(tareaEditada)

      modoEditToggle()
      setError(null)
    }else{
      setError("Debe ingresar una tarea")
    }

    
  }

  

  return (
    <div className="container">
      <h1 className="text-center">CRUD</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={ModoEdit ? editarTarea : agregarTarea}>
            <div className="mb-4">
              <h4 className="text-center">Formulario</h4>
            </div>
            <div className="mb-3">
              <label>{ ModoEdit ? 'Edita tu tarea' : 'Ingrese una tarea' }</label>
              { Error ? ( <span className = 'text-danger float-right mx-2'>{Error}</span> ) : null }
              <input
                type="text"
                className="form-control"
                value = {Tarea}
                onChange={(e) => setTarea(e.target.value)}
                autoFocus
              />
            </div>
            {
              ModoEdit ? (
                <>
                <button className="btn btn-secondary float-right mx-2" type="submit" onClick = {()=>modoEditToggle()}>
                  Cancelar
                </button>
                <button className="btn btn-warning float-right mx-2" type="submit">
                  Editar
                </button>
                </>
              ) : (
                <button className="btn btn-primary btn-block" type="submit">
                  Agregar
                </button>
              )
            }
          </form>
        </div>
        <div className="col-md-6">
          <div className="mb-4">
            <h4 className="text-center">Lista de tareas</h4>
          </div>
          <ul className="list-group">
            {
              ArrayTareas.length === 0 ? (
                <>
                  <span className = 'text-center' >No hay tareas aún :( </span>
                </>
              ) : (
                ArrayTareas.map( tarea => (
                  <li key = {tarea.id} className="list-groip-item mb-2">
                    <span>{tarea.nombre}</span>
                    <button className="btn btn-warning sm float-right mx-2" value = {tarea.id} onClick = {() => modoEditToggle(true, tarea)}>Editar</button>
                    <button className="btn btn-danger sm float-right mx-2" value = {tarea.id} onClick = {eliminarTarea}>Eliminar</button>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
