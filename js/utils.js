class DateUtils {
  static leftPad(value){
    if(value >= 10){
      return value;
    }
    return `0${value}`; //날짜가 10보다 작으면 01, 02, ..처럼 표기
  }
  
  static toStringByFormatting(date) {
    const year = date.getFullYear();
    const month = this.leftPad(date.getMonth() + 1); //1월을 0으로 반환
    const day = this.leftPad(date.getDate());
    
    return [year, month, day].join("-");//리스트의 요소를 문자열로 합쳐줄때 ','을 '-'로 바꿔서 반환
  }
}