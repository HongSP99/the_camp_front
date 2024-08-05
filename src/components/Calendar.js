import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from "../styles/reservation/Calendar.module.css";

const Calendar = ({ isAdmin, onDatesSelected }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [days, setDays] = useState(0);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setDays(diffDays);

            if (diffDays > 4 && !isAdmin) {
                alert('최대 4박까지 가능합니다.');
                setStartDate(null);
                setEndDate(null);
                setDays(0);
            } else {
                onDatesSelected(start, end);
            }
        }
    };

    return (
        <div className={styles.calendarContainer}>
            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                locale={ko}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                monthsShown={2}
                placeholderText="날짜를 선택하세요"
            />
            <div className={styles.dateInfo}>
                {startDate && endDate && (
                    <>
                        <p>시작 날짜: {startDate.toLocaleDateString()}</p>
                        <p>종료 날짜: {endDate.toLocaleDateString()}</p>
                        <p>{days}박 {days + 1}일</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Calendar;