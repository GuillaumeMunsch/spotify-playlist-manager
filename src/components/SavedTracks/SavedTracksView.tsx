import { Box, Button, Flex, Separator, Table } from "@radix-ui/themes";
import { SelectableTrack } from "./SavedTracksContainer";
import TrackRow from "./TrackRow";
import { useState } from "react";
import CreatePlaylistForm from "./CreatePlaylistForm";

type Props = {
  tracks: SelectableTrack[];
  selectFirstBatch: () => void;
  createPlaylistFromTracks: (props: {
    tracks: SelectableTrack;
    playlistName: string;
  }) => void;
};

const SavedTracksView = ({
  tracks,
  selectFirstBatch,
  createPlaylistFromTracks,
}: Props) => {
  const [isCreatePlaylistFormOpen, setIsCreatePlaylistFormOpen] =
    useState(false);
  const numberOfSelectedTracks = tracks.filter(
    ({ isSelected }) => isSelected
  ).length;
  const areAnyTracksSelected = numberOfSelectedTracks > 0;
  return (
    <Box>
      <Flex m="4" justify="between" align="center">
        <Box>
          Selected: {numberOfSelectedTracks} / {tracks.length}
        </Box>
        <Flex gap="4">
          {areAnyTracksSelected && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                return setIsCreatePlaylistFormOpen(true);
              }}
            >
              Create playlist
            </Button>
          )}
          <Button onClick={selectFirstBatch}>Select first 100</Button>
        </Flex>
      </Flex>
      <Separator size="4" />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Checkbox</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tracks.map((track) => (
            <TrackRow key={track.id} track={track} />
          ))}
        </Table.Body>
      </Table.Root>
      <CreatePlaylistForm isOpen={isCreatePlaylistFormOpen} />
    </Box>
  );
};

export default SavedTracksView;
