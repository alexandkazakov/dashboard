import { FC, useRef, useState } from "react";
import style from "./UploadFile.module.scss";
import { Card } from "../../common/Card";
import { Loader } from "../../common/Loader";
import { SuccessIcon } from "../../common/icons/SuccessIcon";
import { FailedIcon } from "../../common/icons/FailedIcon";
import { useUploadFileMutation } from "../../../store/services/datesApi";

type ErrorDataResponse = {
  detail: string;
};

type ErrorResponseAnother = {
  status: number | string;
  error: string;
};

export const UploadFile: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAllowAccess, setIsAllowAccess] = useState<boolean>(false);
  const [isReadyLoad, setIsReadyLoad] = useState<boolean>(true);
  const [allowError, setAllowError] = useState<string>("");

  const [uploadFile, { isLoading, isSuccess, isError, error }] =
    useUploadFileMutation();

  const errorData = (error && ("data" in error ? error.data : error)) as
    | ErrorDataResponse
    | ErrorResponseAnother;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileChangeClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFile) {
      const formData: FormData = new FormData();
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      formData.append("file", blob, selectedFile.name);
      setIsReadyLoad(false);
      uploadFile({ formData, method: "POST" });
    }
  };

  const handleRepeat = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedFile(null);
    setIsReadyLoad(true);
  };

  const handleSubmitAccess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passForm = event.target as HTMLFormElement;
    const passInput = passForm["password"] as HTMLInputElement;

    if (passInput.value === "...") {
      setIsAllowAccess(true);
    } else {
      setAllowError("Неверный пароль");
    }
  };

  const handleReplaceFile = () => {
    if (
      selectedFile &&
      confirm("Вы уверены, что хотите заменить существующие данные?")
    ) {
      const formData: FormData = new FormData();
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      formData.append("file", blob, selectedFile.name);
      setIsReadyLoad(false);
      uploadFile({ formData, method: "PATCH" });
    }
  };

  const PasswordForm = () => {
    return (
      <form
        onSubmit={handleSubmitAccess}
        className={style.UploadFile__formAccess}
      >
        <span className={style.UploadFile__fileName}>
          Доступ к загрузке файла
        </span>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Введите пароль"
          className={style["UploadFile__input"]}
        />
        <button
          className={`${style.UploadFile__btn} ${style["UploadFile__btn--active"]}`}
          type="submit"
        >
          Разрешить доступ
        </button>
        <span className={style.UploadFile__allowError}>{allowError}</span>
      </form>
    );
  };

  const SelectedFileForm = () => {
    return (
      <div className={style.UploadFile__btnGroup}>
        <button
          className={`${style.UploadFile__btn} ${!selectedFile ? style["UploadFile__btn--active"] : style["UploadFile__btn--change"]}`}
          onClick={handleFileChangeClick}
        >
          {selectedFile ? "Изменить" : "Выберите файл"}
        </button>
        <button
          className={`${style.UploadFile__btn} ${selectedFile ? style["UploadFile__btn--active"] : ""}`}
          type="submit"
          disabled={!selectedFile}
        >
          Загрузить
        </button>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
          ref={inputRef}
          hidden
        />
      </div>
    );
  };

  return (
    <div className={style.UploadFile}>
      <h2 className={"dash__title"}>
        {isAllowAccess
          ? "Выберите файл для обновления данных отчёта"
          : "Введите пароль"}
      </h2>
      <Card>
        {!isAllowAccess && <PasswordForm />}
        {isAllowAccess && (
          <form onSubmit={handleSubmit} className={style.UploadFile__form}>
            <span className={style.UploadFile__fileName}>
              {selectedFile ? selectedFile.name : "Файл не выбран"}
            </span>
            {isReadyLoad && <SelectedFileForm />}
            {!isReadyLoad && (
              <div className={style.UploadFile__loading}>
                <div className={style.UploadFile__spinnerWrapper}>
                  {isLoading && <Loader />}
                  {isSuccess && <SuccessIcon />}
                  {isError && <FailedIcon />}
                </div>
                <div className={`${style.UploadFile__loadingText}`}>
                  {isLoading && <span>Загрузка файла</span>}
                  {isSuccess && <span>Файл загружен</span>}
                  {isError && (
                    <>
                      <span>Произошла ошибка.</span>
                      <a
                        href="#"
                        className={style.UploadFile__link}
                        onClick={handleRepeat}
                      >
                        Попробуйте еще раз
                      </a>
                    </>
                  )}
                </div>
                {error && (
                  <div className={style.UploadFile__errorDescr}>
                    <span className={style.UploadFile__errorDescr_title}>
                      Описание ошибки:
                    </span>
                    {"detail" in errorData
                      ? errorData.detail
                      : `Неизвестная ошибка: ${JSON.stringify(errorData.error)}`}
                    {"status" in error && error.status === 409 && (
                      <a
                        href="#"
                        className={style.UploadFile__link}
                        onClick={handleReplaceFile}
                      >
                        Заменить данные?
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        )}
      </Card>
    </div>
  );
};
