import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function Lista() {
    const [tarea, setTarea] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [completadas, setCompletadas] = useState([]);


    function nueva(event) {
        setNuevaTarea(event.target.value);
    }

    function agregaTarea() {
        if (nuevaTarea.trim()) {
            setTarea([...tarea, nuevaTarea.trim()]);
            setNuevaTarea("");
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Escribe algo antes de agregar una tarea',
            });
        }
    }

    function borrar(index) {
        Swal.fire({
            title: "¿Esta seguro de borrar la actividad?",
            showDenyButton: true,
            confirmButtonText: "Elimina",
            denyButtonText: `No`
        }).then((result) => {
            if (result.isConfirmed) {
                const listaFiltrada = tarea.filter((tareaActual, i) => i !== index);
                setTarea(listaFiltrada);
            }
        });
    }

    function completar(index) {
        const nuevasCompletadas = [...completadas];
        nuevasCompletadas[index] = true;
        setCompletadas(nuevasCompletadas);
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col">
                    <h1>ToDo</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6 d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="ESCRIBE LA TAREA"
                        value={nuevaTarea}
                        onChange={nueva}
                        className="form-control mr-3"
                    />
                    <Button className="btn-primary" onClick={agregaTarea}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>

                <div className="col-5 offset-1">
                    <table className="table bordered">
                        <thead>
                            <tr className="bg-black text-white">
                                <th>Tarea</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tarea.map((texto, index) => (
                                <tr key={index} className={completadas[index] ? 'table-success' : ''}>
                                    <td>
                                        <span>{texto}</span>
                                    </td>
                                    <td>
                                        <Button className="btn-success"
                                                onClick={() => completar(index)}
                                                disabled={completadas[index]}
                                        >
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button className="btn-danger"
                                                onClick={() => borrar(index)}
                                                disabled={completadas[index]}
                                        >
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}


export default Lista