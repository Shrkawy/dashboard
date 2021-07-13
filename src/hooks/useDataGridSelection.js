import { useEffect, useState } from "react";

export const useDataGridSelection = (collection) => {
  const [showSelect, setShowSelect] = useState(false);
  const [disableDeleteBtn, setDisableDeleteBtn] = useState();

  useEffect(() => {
    if (collection.selectionModel.length > 0) {
      return setDisableDeleteBtn(false);
    } else {
      return setDisableDeleteBtn(true);
    }
  }, [collection.selectionModel.length]);

  const handleShowSelection = () => setShowSelect(!showSelect);

  const handleMultiDelete = () => {
    console.log(`Delete this ${collection.selectionModel}`);
  };

  return [showSelect, handleShowSelection, disableDeleteBtn, handleMultiDelete];
};
