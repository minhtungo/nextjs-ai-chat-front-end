import { getSubjectLabelFromValue } from "@/lib/utils";
import { countSubjectsUseCase } from "@/use-cases/admin/user";
import { FC } from "react";
import SubjectsChart from "./SubjectsChart";
import UserOverview from "./UserOverview";

interface OverviewProps {}

const Overview: FC<OverviewProps> = async () => {
  const subjectCounts = await countSubjectsUseCase();

  const subjectData = Object.entries(subjectCounts).map(([subject, count]) => {
    return { subject: getSubjectLabelFromValue(subject), count };
  });

  return (
    <>
      <UserOverview />
      <div className="grid grid-cols-2">
        <SubjectsChart subjectsData={subjectData} />
      </div>
    </>
  );
};

export default Overview;
