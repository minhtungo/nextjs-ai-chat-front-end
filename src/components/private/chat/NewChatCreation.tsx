"use client";

import SubmitButton from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateChat } from "@/data/mutations/use-create-chat";
import { SUBJECTS_BY_LEVEL } from "@/lib/constant";
import { useCentrifuge } from "@/store/centrifuge";
import { FC, useState } from "react";
import SubjectsRadio from "./SubjectsRadio";

interface NewChatCreationProps {
  toggleDialog?: (value: boolean) => void;
}

const NewChatCreation: FC<NewChatCreationProps> = ({ toggleDialog }) => {
  const centrifuge = useCentrifuge();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );

  const { mutateAsync: createChat, isPending } = useCreateChat(toggleDialog);

  const createNewChat = async () => {
    if (!selectedSubject) {
      return;
    }
    await createChat({
      subject: selectedSubject,
    });
  };

  return (
    <>
      <Tabs defaultValue={SUBJECTS_BY_LEVEL[0].level}>
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-3">
          <TabsList>
            {SUBJECTS_BY_LEVEL.map(({ level }) => (
              <TabsTrigger value={level} key={`${level}-tab`}>
                {level}
              </TabsTrigger>
            ))}
          </TabsList>
          <Input
            placeholder="Search subjects"
            className="max-w-[350px] flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {SUBJECTS_BY_LEVEL.map(({ level, subjects }) => (
          <TabsContent value={level} key={`${level}-tab-content`}>
            <SubjectsRadio
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              subjectsList={subjects.filter(
                (subject) =>
                  subject.value
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  subject.label
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
              )}
              isPending={isPending}
              className="grid w-full gap-3 text-sm sm:grid-cols-2"
            />
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-6 flex flex-wrap justify-end gap-x-2">
        {toggleDialog && (
          <Button variant={"outline"} onClick={() => toggleDialog(false)}>
            Cancel
          </Button>
        )}
        <SubmitButton
          type="button"
          disabled={!selectedSubject}
          isPending={isPending}
          onClick={createNewChat}
        >
          Create chat
        </SubmitButton>
      </div>
    </>
  );
};

export default NewChatCreation;
