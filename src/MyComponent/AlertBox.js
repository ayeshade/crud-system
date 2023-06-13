import './AlertBox.css';

const AlertBox = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <center>
        <button type="button btn-2" onClick={handleClose}>
          Close
        </button><br></br><br></br>
        </center>
      </section>
    </div>
  );
};

export default AlertBox;