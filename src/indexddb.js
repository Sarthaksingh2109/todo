var db = null;
export { Add, Delete, Retrive,Update };
function Add(obj) {
    let request = window.indexedDB.open("ToDoApp", 1);
    request.onupgradeneeded = e => {
        db = e.target.result;
        db.createObjectStore("TodoList", { keyPath: "id" });
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        const tx = db.transaction("TodoList", "readwrite");
        const store = tx.objectStore("TodoList");
        store.add(obj);
        db.onerror = function () {
            alert("Can't store data");
        }
        tx.oncomplete = function () {
            db.close();
        }
    }
    request.onerror = (e) => {
        alert("Can't open database");
    }
}
function Delete(id) {
    let request = window.indexedDB.open("ToDoApp", 1);
    request.onupgradeneeded = e => {
        e.target.transaction.abort();
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        const tx = db.transaction("TodoList", "readwrite");
        const store = tx.objectStore("TodoList");
        const data = store.delete(id);
        data.onsuccess = () => {
            if (typeof data.result == "undefined") {
                alert("Task deleted successfully");
            }
            else {
                alert("Can't delete the task");
            }
        }
        data.onerror = () => {
            alert("Can't able to delete task");
        }
        tx.oncomplete = function () {
            db.close();
        }
    }
    request.onerror = () => {
        alert("Can't open database");
    }
}
function Retrive() {
    let data = [];
    let request = window.indexedDB.open("ToDoApp", 1);
    request.onupgradeneeded = e => {
        e.target.transaction.abort();
        return data;
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        const tx = db.transaction("TodoList", "readwrite");
        const store = tx.objectStore("TodoList");
        const cursor = store.openCursor();
        cursor.onsuccess = (e) => {
            const c = e.target.result;
            if (c) {
                const obj = {
                    title: c.value.title,
                    desc: c.value.desc,
                    id: c.key
                }
                data.push(obj);
                c.continue();
            }
        }
    }
    return data;
}
function Update(obj) {
    let request = window.indexedDB.open("ToDoApp", 1);
    request.onupgradeneeded = e => {
        e.target.transaction.abort();
    }
    request.onsuccess = function (event) {
        db = event.target.result;
        const tx = db.transaction("TodoList", "readwrite");
        const store = tx.objectStore("TodoList");
        store.openCursor().onsuccess = function (e) {
            const cursor = e.target.result;
            if(cursor){
                if (cursor.key===obj.id) {
                        const request = cursor.update(obj);
                        request.onsuccess = function () {
                            alert("Successfully Updated")
                        };
                        request.onerror = function () {
                            alert("Can't Update : Value may not be present")
                        };
                }
                else{
                    cursor.continue();
                }
            }
        }
        request.onerror = (e) => {
            alert("Can't open database");
        }
    }
}