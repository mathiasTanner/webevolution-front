import React, { useEffect, useState } from "react";
import { variables } from "../Variables";
import { useLocation } from "react-router";

const Task = (props) => {
  const location = useLocation();
  const id = location.state;
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [taskId, setTaskId] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState(0);
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const refresh = () => {
    let url = null;
    id === null
      ? (url = variables.TASK_URL)
      : (url = variables.TASK_BY_LIST_URL + id);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });

    fetch(variables.LIST_URL)
      .then((response) => response.json())
      .then((data) => {
        setLists(data);
      });
  };

  const addClick = () => {
    setModalTitle("Add Task");
    setTaskId(0);
    setTaskName("");
    setTaskList(0);
    setTaskDeadline(new Date().toISOString().slice(0, 10));
    setTaskStatus("");
  };

  const editClick = (tsk) => {
    setModalTitle("Edit Task");
    setTaskId(tsk.TaskId);
    setTaskName(tsk.TaskName);
    setTaskList(tsk.List);
    setTaskDeadline(tsk.Deadline);
  };

  const changeStatus = (e) => {
    console.log(e.target.value);
    setSelectedStatus(e.target.value);
    setTaskStatus(e.target.value);
  };

  const createClick = () => {
    fetch(variables.TASK_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TaskName: taskName,
        List: taskList,
        Deadline: taskDeadline,
        Status: taskStatus,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          refresh();
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  const updateClick = () => {
    fetch(variables.TASK_URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TaskId: taskId,
        TaskName: taskName,
        List: taskList,
        Deadline: taskDeadline,
        Status: taskStatus,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          refresh();
        },
        (error) => {
          console.log(error);
          alert("Failed");
        }
      );
  };

  const deleteClick = (id) => {
    if (window.confirm("Are you Sure?")) {
      fetch(variables.TASK_URL + "/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            refresh();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  };

  const flushState = () => {
    setTaskId(0);
    setTaskName("");
    setTaskList(0);
    setTaskDeadline("");
    setTaskStatus("");
  };

  useEffect(() => {
    console.log(tasks);
    if (tasks.length === 0) {
      refresh();
    }
  }, [tasks]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
      >
        Add Task
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task Name</th>
            <th>Task List Id</th>
            <th>Task Deadline</th>
            <th>Task Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((tsk) => (
            <tr key={tsk.TaskId}>
              <td>{tsk.TaskId}</td>
              <td>{tsk.TaskName}</td>
              <td>{tsk.List}</td>
              <td>{tsk.Deadline}</td>
              <td>
                {tsk.Status === null
                  ? "not started"
                  : tsk.Status === false
                  ? "in Progress"
                  : "done"}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(tsk)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => deleteClick(tsk.TaskId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={flushState}
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Task Name</span>
                <input
                  type="text"
                  className="form-control"
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">List</span>
                <select
                  className="form-select"
                  onChange={(e) => setTaskList(e.target.value)}
                  value={taskList}
                >
                  {lists.map((lst) => (
                    <option key={lst.ListId} value={lst.ListId}>
                      {lst.ListName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Deadline</span>
                <input
                  type="date"
                  asp-format="{0:yyyy-MM-dd}"
                  className="form-control"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Status</span>
                <select
                  className="form-select"
                  onChange={(e) => changeStatus(e)}
                  value={selectedStatus}
                >
                  <option value={""}>not started</option>
                  <option value={false}>in progress</option>
                  <option value={true}>done</option>
                </select>
              </div>
              {taskId === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={createClick}
                >
                  Create
                </button>
              ) : null}
              {taskId !== 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={updateClick}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
