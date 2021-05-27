import { Chip, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import Paper from "../UI/Paper";

export default function Tags(props) {
  const { tags, setTags } = props;
  const [value, setValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value === "") return;
      const index = tags.length ? tags.length + 1 : 1;
      setTags((curr) => [...curr, { id: index, label: value }]);
      setValue("");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = (e) => {
    setTags((tags) => tags.filter((tag) => tag.id !== e.id));
  };

  return (
    <Paper variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={12}>
          <TextField
            fullWidth
            value={value}
            variant="outlined"
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            placeholder="Enter a tag"
          ></TextField>
        </Grid>
        <Grid item>
          {tags.map((tag) => (
            <Chip
              style={{ margin: "0.5rem" }}
              key={tag.id}
              color="primary"
              label={tag.label}
              onDelete={() => handleDelete(tag)}
            />
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
