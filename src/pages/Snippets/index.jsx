import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader";
import BackArrowIcon from "../../assets/BackArrowIcon";
import Popper from "../../components/Popper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { H2 } from "../../components/Typography";
import Confirm from "../../components/Confirm";
import DeleteIcon from "../../assets/DeleteIcon";
import AddIcon from "../../assets/AddIcon";
import { saveSnippets, updateSnippet, deleteSnippet } from "../../services/snippets";
import { errorToast } from "../../components/Toaster";
import uuid from "uuid/v1";
import styles from "./Snippets.module.scss";

const Snippets = props => {
  const { history, busy, data } = props;
  let dragSource = "";
  
  // const [favourites, setFavourites] = useState(
  //   data.filter(snip => snip.isFav).slice(0, 9)
  // );
  const favourites = data.filter(snip => snip.isFav).slice(0, 9);
  console.log('favs', favourites);
  // const [other, setOther] = useState(data.filter(snip => !snip.isFav));
  let other = data.filter(snip => !snip.isFav);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [snippetCode, setSnippetCode] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState({});

  const navigate = () => {
    history.push("/");
  };

  function onHandleReorder(id, items) {
    id === "snippets"
      ? saveSnippets(favourites, items)
      : saveSnippets(items, other);
  }

  const onHandleMove = item => {
    var s = Object.assign({}, item);
    s.isFav = !item.isFav;
    updateSnippet(s);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    result["updatedItem"] = Object.assign({}, removed);
    return result;
  };

  const getList = id => {
    if (id === "favourites") return favourites;
    else return other;
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    if (
      source.droppableId === "snippets" &&
      destination.droppableId === "favourites" &&
      favourites.length === 9
    ) {
      errorToast(10, "Max 9 favourites");
      return;
    }

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        source.droppableId === "favourites" ? favourites : other,
        source.index,
        destination.index
      );

      onHandleReorder(source.droppableId, items);

      return;
    }

    console.log("before move");
    result = move(
      getList(source.droppableId),
      getList(destination.droppableId),
      source,
      destination
    );

    onHandleMove(result["updatedItem"]);
    return;
  }

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "5px",
    margin: "0px 0px 8px",
    textAlign: "center",
    display: "flex",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#91127e",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver, showScroll) => ({
    background: isDraggingOver ? "lightblue" : "rgba(255, 255, 255, 0.2)",
    padding: grid,
    width: "100%"
  });

  const onDragStart = start => {};

  const isDisabled = () => {
    return snippetName.length === 0 || snippetCode.length === 0;
  };

  const handleEditSnippet = snippet => {
    setSelectedSnippet(snippet);
    setSnippetName(snippet.name);
    setSnippetCode(snippet.data.__cdata);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setSelectedSnippet({
      data: { __cdata: "" },
      isFav: false,
      id: null,
      name: ""
    });
    setSnippetName("");
    setSnippetCode("");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    var newList = [...other];

    var s = Object.assign({}, selectedSnippet);
    s.name = snippetName;
    s.data.__cdata = snippetCode;
    //new snipet
    if (!s.id) {
      s.id = uuid();
      s.isFav = false;
      newList.push(s);
      other = newList;
      saveSnippets(favourites, newList);
    } else {
      updateSnippet(s);
    }

    setIsOpen(false);
  };

  const handleDelete = item => {
    setShowConfirm(true);
    setSelectedSnippet(item);
  };

  const handleOk = () => {
    console.log("ok");
    setShowConfirm(false);
    deleteSnippet(selectedSnippet);
  };

  const handleCancel = () => {

    console.log("cancel");
    setShowConfirm(false);
  };

  const renderContent = () => {
    return (
      <div className={styles.Content}>
        <AddIcon onClick={handleAdd} className={styles.AddIcon} />
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable droppableId="favourites">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <H2 className={styles.ListHeader}>Favourites</H2>
                <div className={styles.Snippets}>
                  {favourites.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            false
                          )}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className={styles.Handle}
                          />
                          <div
                            className={styles.SnippetTitle}
                            onClick={() => handleEditSnippet(item)}
                          >
                            {item.name}
                          </div>
                          <div
                            className={styles.DeleteSnippet}
                            onClick={() => handleDelete(item)}
                          >
                            <DeleteIcon className={styles.DeleteIcon} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="snippets">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, other.length > 9)}
              >
                <H2 className={styles.ListHeader}>Snippets</H2>
                <div className={styles.Snippets}>
                  {other.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className={styles.Handle}
                          />
                          <div
                            className={styles.SnippetTitle}
                            onClick={() => handleEditSnippet(item)}
                          >
                            {item.name}
                          </div>
                          <div
                            className={styles.DeleteSnippet}
                            onClick={() => handleDelete(item)}
                          >
                            <DeleteIcon className={styles.DeleteIcon} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {isOpen ? (
          <Popper handleClose={handleClose}>
            <div className={styles.NewSnippetContent}>
              <form>
                <div className={styles.NameContent}>
                  <span className={styles.FormLabel}>Name:</span>
                  <div className={styles.Name}>
                    <input
                      className={styles.NameInput}
                      onChange={e => setSnippetName(e.target.value)}
                      value={snippetName}
                    />
                  </div>
                </div>
                <div className={styles.CodeContent}>
                  <span className={styles.FormLabel}>Code:</span>
                  <div className={styles.Code}>
                    <textarea
                      className={styles.CodeInput}
                      onChange={e => setSnippetCode(e.target.value)}
                      value={snippetCode}
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.AddButton}
                    onClick={handleSave}
                    disabled={isDisabled()}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Popper>
        ) : null}

        {showConfirm ? (
          <Confirm
            title="Delete snippet?"
            message={`Are you sure you want to delete ${selectedSnippet.name}`}
            onOk={handleOk}
            onCancel={handleCancel}
            canAbort
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <BackArrowIcon className={styles.ArrowIcon} onClick={navigate} />
      {busy ? (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.snippets
});
export default connect(mapStateToProps)(Snippets);
