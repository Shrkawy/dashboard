import { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { FormHelperText, Grid, Typography } from "@material-ui/core";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CLOUDINARY_URL = " https://api.cloudinary.com/v1_1/sharkawy/image/upload";
const CLOUDINARY_PRESET = "ua2flimw";

export default function Draft(props) {
  const { description, setDescription, helperText } = props;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      reader.onloadend = async () => {
        try {
          const res = await axios.post(CLOUDINARY_URL, formData);
          const url = res.data.secure_url;
          resolve({ data: { link: url } });
          return { url };
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (editorState.getCurrentContent().getPlainText() === "")
      return setDescription(null);
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setDescription(text);
  }, [editorState, setDescription]);

  useEffect(() => {
    if (!description) setEditorState(() => EditorState.createEmpty());
  }, [description]);

  return (
    <Grid item xs={12}>
      <Typography paragraph align="left">
        Descriotion
      </Typography>
      <Editor
        toolbar={{ image: { uploadCallback } }}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        editorClassName="editor-class"
        placeholder="good keywords will help you!"
      />
      {helperText ? (
        <FormHelperText error>{`*${helperText}`}</FormHelperText>
      ) : null}
    </Grid>
  );
}
