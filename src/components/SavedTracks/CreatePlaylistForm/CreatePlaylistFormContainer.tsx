import CreatePlaylistFormView from "./CreatePlaylistFormView";

type Props = {
  isOpen: boolean;
};

const CreatePlaylistFormContainer = ({ isOpen }: Props) => {
  return <CreatePlaylistFormView isOpen={isOpen} />;
};

export default CreatePlaylistFormContainer;
