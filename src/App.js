import React, { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { listLocations } from "./graphql/queries";
import {
  createLocation as createLocationMutation,
  deleteLocation as deleteLocationMutation,
} from "./graphql/mutations";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const initialFormState = { name: "", description: "" };

function App({ signOut }) {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    const apiData = await API.graphql({ query: listLocations });
    setLocations(apiData.data.listLocations.items);
  }

  async function createLocation() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createLocationMutation,
      variables: { input: formData },
    });
    setLocations([...locations, formData]);
    setFormData(initialFormState);
  }

  async function deleteLocation({ id }) {
    const newNotesArray = locations.filter((location) => location.id !== id);
    setLocations(newNotesArray);
    await API.graphql({
      query: deleteLocationMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Location name"
        value={formData.name}
      />
      <input
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Location description"
        value={formData.description}
      />
      <button onClick={createLocation}>Create Location</button>
      <div style={{ marginBottom: 30 }}>
        {locations.map((location) => (
          <div key={location.id || location.name}>
            <h2>{location.name}</h2>
            <p>{location.description}</p>
            <button onClick={() => deleteLocation(location)}>
              Delete location
            </button>
          </div>
        ))}
      </div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default withAuthenticator(App);
