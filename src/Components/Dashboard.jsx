import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletingFromServer,
  gettingFromServer,
  postingToServer,
  sortingFilter
} from "../Redux/City/action";

function Dashboard() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [population, setPopulation] = useState("");

  const myData = useSelector((state) => state.dataFromAPI);
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("inside useEffect");
    const getDataFromAPI = gettingFromServer();
    dispatch(getDataFromAPI);
    return () => {};
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting ", id);
    const deleteAction = deletingFromServer(id);
    dispatch(deleteAction);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (country.length <= 3 || city.length <= 3 || population <= 10) {
      alert("Invalid Details");
      return;
    }
    const payload = {
      id: myData.length,
      country,
      city,
      population
    };
    const postingAction = postingToServer(payload);
    dispatch(postingAction);
  };

  const handleFilterChange = (e) => {
    if (e.target.value !== "null") {
      const sorting = sortingFilter(e.target.value);
      dispatch(sorting);
    } else if (e.target.value === "null") {
      const getDataFromAPI = gettingFromServer();
      dispatch(getDataFromAPI);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ float: "right", margin: "0px 100px" }}>
        Population:
        <select style={{ height: "30px" }} onChange={handleFilterChange}>
          <option value={"null"}>None</option>
          <option value="asc">Ascending Order</option>
          <option value="DESC">Descending Order</option>
        </select>
      </div>

      <table border="4px solid red">
        <thead>
          <td>Id</td>
          <td>Country</td>
          <td>City</td>
          <td>Population</td>
          <td>Edit</td>
          <td>Delete</td>
        </thead>

        {myData.map((obj) => {
          return (
            <tr key={obj.id}>
              {Object.keys(obj).map((item) => (
                <td style={{ padding: "5px" }}>{obj[item]}</td>
              ))}
              <td style={{ padding: "5px" }}>
                <button>Edit</button>
              </td>
              <td style={{ padding: "5px" }}>
                <button onClick={() => handleDelete(obj.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
        {isLoading && <h2>...Loading</h2>}
        {isError && <h2>...Error</h2>}
      </table>
      <br />
      <br />
      <div
        style={{
          padding: "8px",
          border: "5px solid teal",
          width: "300px",
          margin: "auto"
        }}
      >
        <h1>Add New Data</h1>
        <form onSubmit={handleFormSubmit}>
          <label for="country">Country:</label>
          <input
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />
          <br />
          <label for="city">City:</label>
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <br />
          <label for="population">Population:</label>
          <input
            name="population"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
          />
          <br />
          <br />
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
