import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";

function App() {
  const db = firebase.firestore();
  //ESTADOS
  const [Tarea, setTarea] = useState("");
  const [ArrayTareas, setArrayTareas] = useState([]);
  const [ModoEdit, setModoEdit] = useState(false);
  const [ID, setID] = useState("");
  const [Error, setError] = useState(null);
  //FIN ESTADOS

  useEffect(() => {
    obtenerTareas();
  }, []);

  //FUNCIONES
  const obtenerTareas = async () => {
    try {
      const coll = await db.collection("tareas").get();
      const arrayAux = coll.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArrayTareas(arrayAux);
    } catch (error) {
      console.log(error);
    }
  };
  

  const agregarTarea = async (e) => {
    e.preventDefault();
    //validaciones
    if (Tarea.trim()) {
      const data = {
        name: Tarea,
      };
      try {
        await db.collection("tareas").add(data);
        await obtenerTareas();
        setError(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Debe ingresar una tarea");
    }
    //LIMPIAR CAMPOS
    setTarea("");
  };

  const eliminarTarea = async (id) => {
    try {
      await db.collection("tareas").doc(id).delete();
      obtenerTareas();
    } catch (error) {
      console.log(error);
    }
  };

  const modoEditToggle = (modo = false, item = false) => {
    setError(null);
    if (modo && item) {
      setModoEdit(true);
      setTarea(item.name);
      setID(item.id);
    } else {
      setModoEdit(modo);
      setTarea("");
    }
  };

  const editarTarea = async (e) => {
    e.preventDefault();

    if (Tarea.trim()) {
      try {
        const data = {
          name: Tarea,
        };

        await db.collection("tareas").doc(ID).set(data);
        obtenerTareas();

        modoEditToggle();
        setError(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Debe ingresar una tarea");
    }
  };
  //FIN FUNCIONES
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
              <label>{ModoEdit ? "Edita tu tarea" : "Ingrese una tarea"}</label>
              {Error ? (
                <span className="text-danger float-right mx-2">{Error}</span>
              ) : null}
              <input
                type="text"
                className="form-control"
                value={Tarea}
                onChange={(e) => setTarea(e.target.value)}
                autoFocus
              />
            </div>
            {ModoEdit ? (
              <>
                <button
                  className="btn btn-secondary float-right mx-2"
                  onClick={() => modoEditToggle()}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-warning float-right mx-2"
                  type="submit"
                >
                  Editar
                </button>
              </>
            ) : (
              <button className="btn btn-primary btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <div className="mb-4">
            <h4 className="text-center">Lista de tareas</h4>
          </div>
          <ul className="list-group">
            {ArrayTareas.length === 0 ? (
              <>
                <span className="text-center">No hay tareas aún :( </span>
              </>
            ) : (
              ArrayTareas.map((tarea) => (
                <li key={tarea.id} className="list-groip-item mb-2">
                  <span>{tarea.name}</span>
                  <button
                    className="btn btn-warning sm float-right mx-2"
                    value={tarea.id}
                    onClick={() => modoEditToggle(true, tarea)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger sm float-right mx-2"
                    value={tarea.id}
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
