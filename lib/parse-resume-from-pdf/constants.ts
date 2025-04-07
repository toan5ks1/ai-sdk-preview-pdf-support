import {
  FeaturedSkill,
  ResumeEducation,
  ResumeProfile,
  ResumeWorkExperience,
} from "./types";

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
};

export const initialEducation: ResumeEducation = {
  school: "",
  degree: "",
  gpa: "",
  date: "",
  descriptions: [],
};
export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };

export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});
