/**
 * Creates sql query string based on how many skills user wants to delete
 * @param {number} skillsAmount
 * @return {string} sql query string
 */
const createSkillDeleteQuery = (skillsAmount: number) => {
  let sql =
    'DELETE FROM UserProfileSkills WHERE UserProfile_userprofileid = ? AND ';

  for (let i = 0; i < skillsAmount; i++) {
    if (i === skillsAmount - 1) {
      sql += 'Skills_name = ?;';
    } else {
      sql += 'Skills_name = ? OR ';
    }
  }
  return sql;
};

export default createSkillDeleteQuery;
