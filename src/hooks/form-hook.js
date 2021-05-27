import { useEffect, useState } from "react";
import { useForm as useFormHook } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useForm = (initValues, schema) => {
  const [images, setImages] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    watch,
    setError,
  } = useFormHook({ initValues, resolver: yupResolver(schema) });

  useEffect(() => {
    const modImagesArray = Array.from(imagesArray, ({ url }) => url);
    setValue("images", modImagesArray);
    console.log(imagesArray);
    if (imagesArray.length !== 0) clearErrors("images");
  }, [imagesArray, setValue, clearErrors]);

  useEffect(() => {
    setValue("description", description);
    if (description !== null) {
      clearErrors("description");
    } else {
      setError("description", { message: "*Required" });
    }
  }, [description, setValue, clearErrors, setError]);

  useEffect(() => {
    const modTagsArray = Array.from(tags, ({ label }) => label);
    setValue("tags", modTagsArray);
    if (tags.length !== 0) clearErrors("tags");
  }, [tags, setValue, clearErrors]);

  const onReset = () => {
    reset({ keepDefaultValues: true });
    setImagesArray([]);
    setImages([]);
    setTags([]);
    setDescription();
  };

  const onSubmit = (data) => {
    console.log(data);
    reset({ keepDefaultValues: true });
    setImagesArray([]);
    setImages([]);
    setTags([]);
    setDescription();
  };

  return {
    errors,
    reset,
    isValid,
    register,
    handleSubmit,
    control,
    setImagesArray,
    clearErrors,
    watch,
    setDescription,
    tags,
    setTags,
    images,
    setImages,
    onReset,
    onSubmit,
    description,
  };
};
