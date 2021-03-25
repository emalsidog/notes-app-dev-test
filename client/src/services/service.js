export default class Service {
  _url = "http://localhost:3001";

  // POST => Add note
  addNote = async (data) => {
    const response = await fetch(`${this._url}/add-note`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };

  // POST => Create new list
  createList = async (newListTitle) => {
    const response = await fetch(`${this._url}/lists/add-list`, {
      method: "POST",
      body: JSON.stringify({ title: newListTitle }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json?.body.newList;
  };

  // POST => edit note
  editNote = async (data) => {
    const response = await fetch(`${this._url}/edit-note`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };

  // GET => notes
  getNotes = async (listId) => {
    const response = await fetch(`${this._url}/lists/${listId}`);
    const json = await response.json();
    return json;
  };

  // GET => Get all lists
  getLists = async () => {
    const response = await fetch(`${this._url}/lists`);
    const json = await response.json();
    return json;
  };
}
