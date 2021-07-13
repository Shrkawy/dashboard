import { Chip, Grid, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Paper from "../UI/Paper";

function hasDuplicates(tags, newTag) {
  for (let i = 0; i < tags.length; ++i) {
    const value = tags[i];
    if (value === newTag) return true;
  }
  return false;
}

export default function Tags(props) {
  const { tags, setTags } = props;
  const [value, setValue] = useState("");
  const { getValues } = useFormContext();

  useEffect(() => {
    setTags(getValues("tags"));
  }, [getValues, setTags]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value === "") return;
      if (hasDuplicates(tags, e.target.value)) return setValue("");
      setTags((curr) => [...curr, value]);
      setValue("");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = (e) => {
    setTags((tags) => tags.filter((tag) => tag !== e));
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
            label="Tags"
          ></TextField>
        </Grid>
        <Grid item>
          {tags.map((tag, i) => (
            <Chip
              style={{ margin: "0.5rem" }}
              key={i}
              color="primary"
              label={tag}
              onDelete={() => handleDelete(tag)}
            />
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
