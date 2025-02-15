import { Notify } from 'notiflix';
import React, { useState } from 'react';
import { useAuth } from '../../../../Hooks';
import * as yup from 'yup';
import { IUser } from '../../../../helpers/Auth.types';
import {
  Avatar,
  FormContainer,
  HiddenFileInput,
  SubmitButton,
} from './avatarUploadStyled';
import { Formik, Form, ErrorMessage } from 'formik';

import { useUpdateAvatarMutation } from '../../../../redux/sliceApi';

const baseURL = process.env.REACT_APP_API_URL;

export const AvatarUpload = () => {
  const [updateAvatar] = useUpdateAvatarMutation();

  const { user } = useAuth() as { user: IUser };

  let prevAvatar = '';
  const isGravatar = user.avatarURL
    ? user.avatarURL.split('/').includes('gravatar.com')
    : false;

  if (isGravatar) {
    prevAvatar = `${user.avatarURL}`;
  } else {
    prevAvatar = `${baseURL}/${user.avatarURL}`;
  }

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(prevAvatar);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAvatar = e.target.files[0];
      if (newAvatar) {
        setImageFile(newAvatar);
        setPreviewUrl(URL.createObjectURL(newAvatar));
      }
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      Notify.info('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('avatarURL', imageFile);

    updateAvatar(formData);
  };

  const avatarSchema = yup.object().shape({
    avatarURL: yup
      .string()
      .matches(/\.(jpg|png|jpeg)$/, 'Only .jpeg, .jpg, and .png are allowed'),
  });

  const initialValues = {
    avatarURL: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={avatarSchema}
      onSubmit={handleSubmit}
    >
      <FormContainer>
        <Form>
          <label>
            {previewUrl && (
              <div>
                <Avatar src={previewUrl} alt="Avatar" width="200" />
              </div>
            )}

            <HiddenFileInput
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <ErrorMessage name="avatarURL" component=" div" />

          <SubmitButton type="submit"> Update Photo</SubmitButton>
        </Form>
      </FormContainer>
    </Formik>
  );
};
