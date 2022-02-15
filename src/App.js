import { useRef, useState } from "react";
import "./App.css";

let sortDirections = {
  name: 0,
  lname: 0,
  email: 0,
};

function App() {
  const formRef = useRef();

  const [data, setData] = useState([]);

  const sortByField = (field) => {
    const direction = sortDirections[field] === 1 ? "desc" : "asce";

    setData((state) => [
      ...state.sort((a, b) => {
        if (a[field] > b[field]) {
          return direction === "desc" ? -1 : 1;
        }
        if (a[field] < b[field]) {
          return direction === "desc" ? 1 : -1;
        }
        return 0;
      }),
    ]);
    Object.keys(sortDirections).forEach((fields) => {
      sortDirections[fields] = 0;
    });
    if (direction === "asce") {
      sortDirections[field] = 1;
    }
  };

  const [nameSearch, searchName] = useState("");
  const [lnameSearch, searchLname] = useState("");
  const [emailSearch, searchEmail] = useState("");

  const handleNameSearch = (e) => searchName(e.target.value.toLowerCase());
  const handleLnameSearch = (e) => searchLname(e.target.value.toLowerCase());
  const handleEmailSearch = (e) => searchEmail(e.target.value.toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target;
    const name = user.name.value;
    const lname = user.lname.value;
    const email = user.email.value;
    if (name === "" || lname === "" || email === "") {
      alert("Invalid Input!");
      return;
    }
    const emailUsed = data.some((user) => user.email === email);
    if (emailUsed) {
      alert("Email already used!");
      return;
    }
    setData((data) => [
      ...data,
      {
        name,
        lname,
        email,
      },
    ]);
    formRef.current.reset();
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label htmlFor="name">First Name:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input type="text" name="lname" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" />
        </div>
        <input type="submit" value="Submit" />
      </form>

      <table>
        <thead>
          <tr>
            <th>
              <div onClick={() => sortByField("name")}>
                First Name{" "}
                <img
                  src={
                    sortDirections.name
                      ? "/images/up-arrow.svg"
                      : "/images/down-arrow.svg"
                  }
                  alt=""
                />
              </div>
              <input
                name="name"
                value={nameSearch}
                onChange={handleNameSearch}
              />
            </th>
            <th>
              <div onClick={() => sortByField("lname")}>
                Last Name{" "}
                <img
                  src={
                    sortDirections.lname
                      ? "/images/up-arrow.svg"
                      : "/images/down-arrow.svg"
                  }
                  alt=""
                />
              </div>

              <input
                name="lname"
                value={lnameSearch}
                onChange={handleLnameSearch}
              />
            </th>
            <th>
              <div onClick={() => sortByField("email")}>
                Email{" "}
                <img
                  src={
                    sortDirections.email
                      ? "/images/up-arrow.svg"
                      : "/images/down-arrow.svg"
                  }
                  alt=""
                />
              </div>

              <input
                name="email"
                value={emailSearch}
                onChange={handleEmailSearch}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={100} style={{ textAlign: "center" }}>
                Nothing here!
              </td>
            </tr>
          ) : null}
          {data
            .filter(
              (user) =>
                user.name.toLowerCase().startsWith(nameSearch) &&
                user.lname.toLowerCase().startsWith(lnameSearch) &&
                user.email.toLowerCase().startsWith(emailSearch)
            )
            .map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.lname}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
