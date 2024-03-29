import CreatePlaylistFormContainer from "./CreatePlaylistFormContainer";

type Track = {
  id: string;
  uri: string;
};

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  tracks: Track[];
};

const CreatePlaylistFormDataLoader = ({
  isOpen,
  closeModal,
  tracks,
}: Props) => {
  return (
    <CreatePlaylistFormContainer
      isOpen={isOpen}
      closeModal={closeModal}
      tracks={tracks}
    />
  );
};

export default CreatePlaylistFormDataLoader;
