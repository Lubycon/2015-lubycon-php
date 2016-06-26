-- ---------------------------
-- ------- CREATE USER -------
-- ---------------------------

# 제한된 권한을 가진 계정을 생성한다 : 
# 데이터베이스에서 root 권한을 가진 계정을 통한 쿼리 교환은
# 쿼리-인젝션 공격이 들어왔을 때, 치명적인 보안 취약점을 갖는다.
# 따라서 정해진 테이블의 SELECT(조회), INSERT(삽입), UPDATE(수정) 권한을
# 부여한 계정을 사용함으로 보안 취약점을 방어한다

-- use database

USE mysql;

-- create user

-- --------------------------
-- ----- Information --------
-- --------------------------

-- user name : lubycon
-- available host : total
-- user pass : hmdwdgdhkr2015
-- only SELECT, INSERT, UPDATE authority 

GRANT USAGE ON lubyconuser.* TO lubycon@'%' IDENTIFIED BY 'hmdwdgdhkr2015';
GRANT SELECT, INSERT, UPDATE ON lubyconuser.* TO lubycon@'%';

GRANT USAGE ON lubyconboard.* TO lubycon@'%' IDENTIFIED BY 'hmdwdgdhkr2015';
GRANT SELECT, INSERT, UPDATE ON lubyconboard.* TO lubycon@'%';
