import { useAppDispatch, useAppSelector } from "../redux/redux";

const EditModalWindow = () => {
  const dispatch = useAppDispatch()
  const currendId = useAppSelector(state => state.modal.currentEdit)
  const isModalEdit = useAppSelector(state => state.modal.isEdit)
    return ( <>
         <div id="modal_2"  className={`modal__window ${isModalEdit ? "show" : "hidden"}`}>
        <div className="modal__window__container">
          <h3 className="modal__window__container__header"></h3>
          <div className="modal__window__container__left">
            <br />
            <input className="modal__window__container__left__name"></input>
            <div className="modal__window__container__left__created"></div>
            <br />
          </div>
          <div className="modal__window__container__right">
            <label htmlFor="content">Content:
            </label><textarea
              name="contentSecond"
              id="contentSecond"
              cols={30}
              rows={10}
            ></textarea>
          </div>

          <a href="#" className="modal__close">Save</a>
        </div>
      </div>

      <div
        className="modal__window__backdrop hidden"
        id="modal-content-backdrop"
      ></div>
    </> );
}
 
export default EditModalWindow;