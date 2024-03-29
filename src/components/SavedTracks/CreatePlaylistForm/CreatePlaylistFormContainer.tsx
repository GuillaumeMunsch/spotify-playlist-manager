import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useSpotifySDK } from "../../../contexts/SDKContext";
import CreatePlaylistFormView from "./CreatePlaylistFormView";
import { Box } from "@radix-ui/themes";

type Track = { id: string; uri: string };

type Props = {
  isOpen: boolean;
  tracks: Track[];
  closeModal: () => void;
};

export type CreatePlaylistFormValues = {
  playlistName: string;
  shouldRemoveTracksFromLikedTitles: boolean;
};

const unlikeTracks = (sdk: SpotifyApi) => async (trackIds: string[]) => {
  const batchSize = 50;
  const total = trackIds.length;
  const unlikeTracksRequests: Promise<void>[] = [];
  for (let i = 0; i * batchSize < total; i++) {
    const start = i * batchSize;
    const end = i * batchSize + batchSize;

    unlikeTracksRequests.push(
      sdk.currentUser.tracks.removeSavedTracks(trackIds.slice(start, end))
    );
  }

  await Promise.all(unlikeTracksRequests);
};

const createPlaylistWithSelectedSongs =
  ({
    sdk,
    closeModal,
    tracks,
  }: {
    sdk: SpotifyApi;
    tracks: Track[];
    closeModal: () => void;
  }) =>
  async (values: CreatePlaylistFormValues) => {
    const { id } = await sdk.currentUser.profile();

    const newPlaylist = await sdk.playlists.createPlaylist(id, {
      name: values.playlistName,
    });
    await sdk.playlists.addItemsToPlaylist(
      newPlaylist.id,
      tracks.map(({ uri }) => uri)
    );
    if (values.shouldRemoveTracksFromLikedTitles) {
      await unlikeTracks(sdk)(tracks.map(({ id }) => id));
    }
    closeModal();
  };

const CreatePlaylistFormContainer = ({ isOpen, tracks, closeModal }: Props) => {
  const { sdk } = useSpotifySDK();

  if (!sdk) return <Box>No Spotify SDK available</Box>;
  return (
    <CreatePlaylistFormView
      onSubmit={createPlaylistWithSelectedSongs({
        sdk,
        tracks,
        closeModal,
      })}
      closeModal={closeModal}
      isOpen={isOpen}
    />
  );
};

export default CreatePlaylistFormContainer;
