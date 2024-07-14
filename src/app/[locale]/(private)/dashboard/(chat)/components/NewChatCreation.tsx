"use client";

import { createNewChatAction } from "@/actions/chat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBJECTS_BY_LEVEL } from "@/lib/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import SubjectsRadio from "./SubjectsRadio";
import { Input } from "@/components/ui/input";

const NewChatCreation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );

  const { isPending, execute } = useServerAction(createNewChatAction);

  const createNewChat = async (subject: string) => {
    setSelectedSubject(subject);

    const [_, error] = await execute({
      subject,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <Tabs defaultValue={SUBJECTS_BY_LEVEL[0].level}>
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-3">
        <TabsList>
          {SUBJECTS_BY_LEVEL.map(({ level }) => (
            <TabsTrigger value={level} key={level}>
              {level}
            </TabsTrigger>
          ))}
        </TabsList>
        <Input
          placeholder="Search subjects"
          className="max-w-[400px] flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {SUBJECTS_BY_LEVEL.map(({ level, subjects }) => (
        <TabsContent value={level} key={`${level}-tab`}>
          <SubjectsRadio
            selectedSubject={selectedSubject}
            onChange={createNewChat}
            subjectsList={subjects.filter(
              (subject) =>
                subject.value
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                subject.label.toLowerCase().includes(searchTerm.toLowerCase()),
            )}
            isPending={isPending}
            className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default NewChatCreation;
