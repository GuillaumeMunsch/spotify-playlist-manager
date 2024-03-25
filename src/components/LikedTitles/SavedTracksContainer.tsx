import { SavedTrack } from "@spotify/web-api-ts-sdk";
import SavedTracksView from "./SavedTracksView";

type Props = {
  savedTracks: SavedTrack[];
};

const SavedTracksContainer = ({ savedTracks }: Props) => {
  return <SavedTracksView />;
};

export default SavedTracksContainer;
