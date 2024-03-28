import {
  AlertDialog,
  Button,
  Flex,
  TextField,
  Checkbox,
} from "@radix-ui/themes";
import { Field, Form, Label, Submit } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
};

type FormValues = {
  playlistName: string;
  playlistFolder?: string;
  shouldRemoveTracksFromLikedTitles: boolean;
};

const CreatePlaylistFormView = ({ isOpen }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This application will no longer be accessible and any
          existing sessions will be expired.
        </AlertDialog.Description>

        <Form
          onSubmit={handleSubmit((values) => {
            console.log("Values", values);
          })}
        >
          <Flex direction="column" gapY="2" my="4">
            <Field name="playlistName">
              <Label>
                Playlist name
                <TextField.Root
                  {...register("playlistName", { required: true })}
                />
              </Label>
            </Field>
            <Field name="playlistFolder">
              <Label>
                Playlist folder
                <TextField.Root
                  {...register("playlistFolder", { required: true })}
                />
              </Label>
            </Field>
            <Field name="shouldRemoveTracksFromLikedTitles">
              <Label>
                <Checkbox {...register("shouldRemoveTracksFromLikedTitles")} />
                Should remove from Liked Titles
              </Label>
            </Field>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button type="submit">Submit</Button>
            </AlertDialog.Action>
          </Flex>
        </Form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CreatePlaylistFormView;
